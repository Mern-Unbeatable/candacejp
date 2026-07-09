import React, { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { Info } from 'lucide-react';
import TravelPreferencesHeader from './components/TravelPreferencesHeader';
import SavedPreferences from './components/SavedPreferences';
import RecurringTravelForm from './components/RecurringTravelForm';
import OneTimeTravelForm from './components/OneTimeTravelForm';
import TravelPreferencesPageSkeleton from '../../../components/common/skeletons/TravelPreferencesPageSkeleton';
import { applyOppositeRoute } from './routeOptions';
import {
  useCreateMemberTravelPreferenceMutation,
  useDeleteMemberTravelPreferenceMutation,
  useMemberTravelPreferencesQuery,
} from '../../../hooks/api/useMemberQueries';
import { getApiErrorMessage } from '../../../hooks/useApiError';

const EMPTY_RECURRING_FORM = {
  from: '',
  to: '',
  day: '',
  time: '',
};

const EMPTY_ONE_TIME_FORM = {
  from: '',
  to: '',
  date: '',
  time: '',
};

const ROUTE_CODE_TO_LABEL = {
  NYC: 'New York',
  TAMPA: 'Tampa',
};

function toRouteLabel(code) {
  return ROUTE_CODE_TO_LABEL[code] ?? code;
}

function dedupeByKey(items, getKey) {
  const seen = new Set();

  return items.filter((item) => {
    const key = getKey(item);
    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

function getRecurringDisplayKey(item) {
  return `${item.from}|${item.to}|${item.day}|${item.time}`;
}

function getOneTimeDisplayKey(item) {
  const dateKey = item.preferredDate
    ? String(item.preferredDate).split('T')[0]
    : item.date;

  return `${item.from}|${item.to}|${dateKey}|${item.time}`;
}

function formatFormDate(dateStr) {
  const [year, month, day] = dateStr.split('-').map(Number);

  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(year, month - 1, day));
}

function formatRecurringDuplicateMessage({ from, to, day, time }) {
  return `You already have this saved: ${toRouteLabel(from)} → ${toRouteLabel(to)} on ${day} (${time}).`;
}

function formatOneTimeDuplicateMessage({ from, to, date, time }) {
  return `You already have this saved: ${toRouteLabel(from)} → ${toRouteLabel(to)} on ${formatFormDate(date)} (${time}).`;
}
function isDuplicateRecurring(form, saved) {
  const from = toRouteLabel(form.from);
  const to = toRouteLabel(form.to);

  return saved.some(
    (item) => item.from === from
      && item.to === to
      && item.day === form.day
      && item.time === form.time,
  );
}

function isDuplicateOneTime(form, saved) {
  const from = toRouteLabel(form.from);
  const to = toRouteLabel(form.to);

  return saved.some((item) => {
    const itemDateKey = item.preferredDate
      ? String(item.preferredDate).split('T')[0]
      : null;

    return item.from === from
      && item.to === to
      && itemDateKey === form.date
      && item.time === form.time;
  });
}

function mapRecurringPreference(item) {
  return {
    id: item.id,
    from: item.from,
    to: item.to,
    day: item.day || item.dayOfWeek,
    time: item.time || item.preferredTime,
    status: item.status,
  };
}

function mapOneTimePreference(item) {
  return {
    id: item.id,
    from: item.from,
    to: item.to,
    date: item.date,
    preferredDate: item.preferredDate,
    time: item.time || item.preferredTime,
    status: item.status,
  };
}

export default function TravelPreferences() {
  const [recurringForm, setRecurringForm] = useState(EMPTY_RECURRING_FORM);
  const [oneTimeForm, setOneTimeForm] = useState(EMPTY_ONE_TIME_FORM);
  const [deletingId, setDeletingId] = useState(null);
  const [addingType, setAddingType] = useState(null);

  const { data, isLoading, isError } = useMemberTravelPreferencesQuery();
  const { mutateAsync: createPreference } = useCreateMemberTravelPreferenceMutation();
  const { mutateAsync: deletePreference } = useDeleteMemberTravelPreferenceMutation();

  const allRecurring = useMemo(
    () => (data?.recurring ?? []).map(mapRecurringPreference),
    [data?.recurring],
  );
  const allOneTime = useMemo(
    () => (data?.oneTime ?? []).map(mapOneTimePreference),
    [data?.oneTime],
  );
  const savedRecurring = useMemo(
    () => dedupeByKey(allRecurring, getRecurringDisplayKey),
    [allRecurring],
  );
  const savedOneTime = useMemo(
    () => dedupeByKey(allOneTime, getOneTimeDisplayKey),
    [allOneTime],
  );

  const recurringDuplicateMessage = useMemo(() => {
    const { from, to, day, time } = recurringForm;
    if (!from || !to || !day || !time || from === to) {
      return null;
    }

    if (!isDuplicateRecurring(recurringForm, allRecurring)) {
      return null;
    }

    return formatRecurringDuplicateMessage(recurringForm);
  }, [recurringForm, allRecurring]);

  const oneTimeDuplicateMessage = useMemo(() => {
    const { from, to, date, time } = oneTimeForm;
    if (!from || !to || !date || !time || from === to) {
      return null;
    }

    if (!isDuplicateOneTime(oneTimeForm, allOneTime)) {
      return null;
    }

    return formatOneTimeDuplicateMessage(oneTimeForm);
  }, [oneTimeForm, allOneTime]);

  useEffect(() => {
    document.title = 'Travel Preferences - Member | RAVEN';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Configure your travel preferences with Raven.');
    } else {
      const newMeta = document.createElement('meta');
      newMeta.name = 'description';
      newMeta.content = 'Configure your travel preferences with Raven.';
      document.head.appendChild(newMeta);
    }
  }, []);

  useEffect(() => {
    if (isError) {
      toast.error('Unable to load travel preferences.');
    }
  }, [isError]);

  const handleRemoveSaved = async (id) => {
    setDeletingId(id);
    try {
      await deletePreference(id);
      toast.success('Travel preference removed.');
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Failed to remove travel preference.'));
    } finally {
      setDeletingId(null);
    }
  };

  const handleChangeRecurringForm = (field, value) => {
    setRecurringForm((prev) => applyOppositeRoute(field, value, prev));
  };

  const handleChangeOneTimeForm = (field, value) => {
    setOneTimeForm((prev) => applyOppositeRoute(field, value, prev));
  };

  const handleAddRecurring = async () => {
    const { from, to, day, time } = recurringForm;

    if (!from || !to || !day || !time) {
      toast.error('Complete all fields before adding recurring travel.');
      return;
    }

    if (from === to) {
      toast.error('Origin and destination must be different.');
      return;
    }

    if (isDuplicateRecurring(recurringForm, allRecurring)) {
      toast.error(formatRecurringDuplicateMessage(recurringForm));
      return;
    }

    setAddingType('RECURRING');
    try {
      await createPreference({
        type: 'RECURRING',
        from,
        to,
        dayOfWeek: day,
        preferredTime: time,
      });
      setRecurringForm(EMPTY_RECURRING_FORM);
      toast.success('Recurring travel added.');
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Failed to add recurring travel.'));
    } finally {
      setAddingType(null);
    }
  };

  const handleAddOneTime = async () => {
    const { from, to, date, time } = oneTimeForm;

    if (!from || !to || !date || !time) {
      toast.error('Complete all fields before adding one-time travel.');
      return;
    }

    if (from === to) {
      toast.error('Origin and destination must be different.');
      return;
    }

    if (isDuplicateOneTime(oneTimeForm, allOneTime)) {
      toast.error(formatOneTimeDuplicateMessage(oneTimeForm));
      return;
    }

    setAddingType('ONE_TIME');
    try {
      await createPreference({
        type: 'ONE_TIME',
        from,
        to,
        preferredDate: date,
        preferredTime: time,
      });
      setOneTimeForm(EMPTY_ONE_TIME_FORM);
      toast.success('One-time travel added.');
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Failed to add one-time travel.'));
    } finally {
      setAddingType(null);
    }
  };

  if (isLoading) {
    return <TravelPreferencesPageSkeleton />;
  }

  return (
    <div className="mx-auto space-y-12 pb-12">
      <TravelPreferencesHeader />

      <SavedPreferences
        recurring={savedRecurring}
        oneTime={savedOneTime}
        onRemoveRecurring={handleRemoveSaved}
        onRemoveOneTime={handleRemoveSaved}
        deletingId={deletingId}
      />

      <div className="space-y-10">
        <RecurringTravelForm
          form={recurringForm}
          onChange={handleChangeRecurringForm}
          onAdd={handleAddRecurring}
          isAdding={addingType === 'RECURRING'}
          duplicateMessage={recurringDuplicateMessage}
        />

        <OneTimeTravelForm
          form={oneTimeForm}
          onChange={handleChangeOneTimeForm}
          onAdd={handleAddOneTime}
          isAdding={addingType === 'ONE_TIME'}
          duplicateMessage={oneTimeDuplicateMessage}
        />
      </div>

      <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-[#F8FAFC] p-4 text-sm text-gray-600 shadow-sm">
        <Info size={18} className="text-gray-500" />
        <p>
          Your preferences help us match you with other members and create curated flight
          opportunities.
        </p>
      </div>
    </div>
  );
}
