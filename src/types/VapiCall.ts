export interface VapiCall {
  status: string;
  type: string;
  endedReason: string | null;
  phoneCallProviderId: string | null;
  startedAt: string | null;
  endedAt: string | null;
  artifact?: {
    presignedMonoUrl?: string;
    presignedStereoUrl?: string;
    messages?: { role: string; message?: string; secondsFromStart?: number }[];
  };
}
