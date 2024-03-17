interface EventProcedureDayQt {
  day: string;
  eventProcedureQuantity: number;
}

export interface PayloadAmountByDay {
  start_date: string;
  end_date: string;
  user_id?: number;
}

export default interface AmountByDay {
  startDate: string;
  endDate: string;
  days: EventProcedureDayQt[];
}
