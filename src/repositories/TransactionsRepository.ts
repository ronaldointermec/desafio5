import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {

    const {income, outcome,} = this.transactions.reduce((accumulator: Balance, transaction: Transaction) => {
      switch (transaction.type) {
        case 'income':
          accumulator.income += transaction.value;
          break;
        case 'outcome':
          accumulator.outcome += transaction.value;
          break;
        default:
          break;
      }
      return accumulator;

    }, {
      income: 0,
      outcome: 0,
      total: 0
    })

    const total = income - outcome;

    return {income, outcome, total};

    // const incomeTransacitons = this.transactions.filter(transaction => (transaction.type.includes('income')));
    // const outcomeTransations = this.transactions.filter(transaction => transaction.type.includes('outcome'));

    // const incomeList = incomeTransacitons.map((income) => income.value);
    // const outcomeList = outcomeTransations.map((income) => income.value);

    // const initialincome = 0;
    // const sumIncome = incomeList.reduce(
    //   (accumulator, currentValue) => accumulator + currentValue,
    //   initialincome
    // );

    // const initialOutcome = 0;
    // const sumOutcome = outcomeList.reduce(
    //   (accumulator, currentValue) => accumulator + currentValue,
    //   initialOutcome
    // );

    // const amounnt = sumIncome - sumOutcome;
    //    const balance: Balance = {
    //   income: sumIncome,
    //   outcome: sumOutcome,
    //   total: sumIncome - amounnt,
    // }

    // return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;

  }
}

export default TransactionsRepository;
