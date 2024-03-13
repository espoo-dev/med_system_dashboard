import AmountByDay, { PayloadAmountByDay } from "@/domain/models/AmountByDay";

export default abstract class DashboardPort {
  abstract getAmountByDay(credentials: PayloadAmountByDay): Promise<AmountByDay | Error>
}
