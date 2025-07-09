export interface Schedule {
  scheduleid: string;
  dayofweek: string;
  maxparticipants: number;
  starttime: string;
  endtime: string;
}

export interface ScheduleFormData {
  dayofweek: string;
  maxparticipants: number;
  starttime: string;
  endtime: string;
}

export interface ScheduleApiResponse {
  items: Schedule[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
}