export module MainType {
  interface TransactionType {
    amount: number;
    date: string;
    description: string;
    type: string;
    transaction_id: string;
  }
}
