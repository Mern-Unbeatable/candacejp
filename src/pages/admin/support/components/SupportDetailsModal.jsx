import React from "react";
import { X } from "lucide-react";
import { useAdminSupportRequestQuery } from "../../../../hooks/api/useAdminQueries";
import {
  formatSupportDate,
  formatSupportStatus,
} from "../supportUtils";

function DetailField({ label, value, multiline = false }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1.5">
        {label}
      </p>
      <p
        className={`text-sm text-gray-900 ${multiline ? "whitespace-pre-wrap leading-relaxed" : ""}`}
      >
        {value || "—"}
      </p>
    </div>
  );
}

export default function SupportDetailsModal({
  requestId,
  onClose,
  onMarkSolved,
  onDelete,
  isActionPending = false,
}) {
  const { data: request, isLoading, isError } = useAdminSupportRequestQuery(requestId);

  if (!requestId) return null;

  const status = request ? formatSupportStatus(request.status) : null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="p-8">
          <div className="mb-6 pr-8">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">
              Support Request
            </h2>
            <p className="text-sm text-gray-600">
              Contact form submission details
            </p>
          </div>

          <div className="border-b border-gray-100 mb-6" />

          {isLoading ? (
            <div className="space-y-5 animate-pulse">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="h-10 rounded-md bg-gray-100" />
              ))}
            </div>
          ) : isError ? (
            <p className="text-sm text-red-500 text-center py-8">
              Unable to load support request.
            </p>
          ) : (
            <>
              <div className="space-y-5">
                <div className="flex items-center justify-between gap-4">
                  <DetailField label="Status" value={status?.label} />
                  {status && (
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${status.className}`}
                    >
                      {status.label}
                    </span>
                  )}
                </div>
                <DetailField label="Name" value={request.name} />
                <DetailField label="Email" value={request.email} />
                <DetailField label="Phone Number" value={request.phone} />
                <DetailField
                  label="Message"
                  value={request.message}
                  multiline
                />
                <DetailField
                  label="Submitted"
                  value={formatSupportDate(request.createdAt)}
                />
                <DetailField
                  label="Last Updated"
                  value={formatSupportDate(request.updatedAt)}
                />
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                {request.status === "NEW" && (
                  <button
                    type="button"
                    disabled={isActionPending}
                    onClick={() => onMarkSolved(request)}
                    className="flex-1 py-3 bg-[#257AFC] hover:bg-blue-600 disabled:opacity-60 text-white text-sm font-semibold rounded-md transition-colors shadow-sm"
                  >
                    Mark as Solved
                  </button>
                )}
                <button
                  type="button"
                  disabled={isActionPending}
                  onClick={() => onDelete(request)}
                  className="flex-1 py-3 bg-[#FDECEC] hover:bg-red-100 disabled:opacity-60 text-[#EA0303] text-sm font-semibold rounded-md transition-colors"
                >
                  Delete Request
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
