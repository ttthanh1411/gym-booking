export interface Schedule {
  scheduleid: string;
  dayofweek: string;
  starttime: number;
  endtime: number;
  maxparticipants: number;
}

export interface ScheduleFormData {
  scheduleid: string;
  dayofweek: string;
  maxparticipants: number;
  starttime: number;
  endtime: number;
}

export interface ScheduleApiResponse {
  items: Schedule[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
}