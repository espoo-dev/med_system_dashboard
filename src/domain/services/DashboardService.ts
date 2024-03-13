import DashboardPort from "@/ports/DashboardPort";
import AmountByDay, { PayloadAmountByDay } from "../models/AmountByDay";
import HttpAdapter from "@/adapters/HttpAdapter";
import HttpAdapterFactory from "@/factories/HttpAdapterFactory";

export default class DashboardService implements DashboardPort {
  private httpAdapter: HttpAdapter;
  private baseUser = '/api/v1/event_procedures_dashboard';

  constructor() {
    this.httpAdapter = HttpAdapterFactory.createHttpAdapter();
  }

  async getAmountByDay(filter: PayloadAmountByDay): Promise<AmountByDay> {
    return await this.httpAdapter.get(`${this.baseUser}/amount_by_day`);
  }
}

// curl --location 'https://med-system-backend.onrender.com/api/v1/event_procedures_dashboard/amount_by_day?start_date=01%2F03%2F2024&end_date=30%2F03%2F2024' \