export const useTransactionsStore = defineStore(`transactionsStore`, {
  state: () => ({
    transactions: [],
  }),
  actions: {
    setTransactions(massive) {
      this.transactions = massive;
    },
    countOfType(type) {
      return this.transactions.filter(
        (transaction) => transaction.type === type
      ).length;
    },
  },
});
