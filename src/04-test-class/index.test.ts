// Uncomment the code below and write your tests
import {BankAccount, InsufficientFundsError, SynchronizationFailedError, TransferFailedError} from '.';
import _ from 'lodash';

// import { getBankAccount } from './index';

describe('BankAccount', () => {
  test('should create account with initial balance', async () => {
    const initialBalance = 5;

    expect(new BankAccount(initialBalance)).toHaveProperty(
      'balance',
      initialBalance,
    );
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const initialBalance = 10;
    const bankAccount = new BankAccount(initialBalance);

    expect(() => bankAccount.withdraw(200)).toThrow(
      new InsufficientFundsError(initialBalance),
    );
  });

  // TODO: invalid test description! Error TransferFailedError occurs only in case of  transferring to the same account
  test('should throw TransferFailedError error when transferring more than balance', () => {
    const initialBalance = 10;
    const bankAccount = new BankAccount(initialBalance);

    expect(() =>
      bankAccount.transfer(100, new BankAccount(initialBalance)),
    ).toThrow(new InsufficientFundsError(initialBalance));
  });

  test('should throw error when transferring to the same account', () => {
    const bankAccount = new BankAccount(10);

    expect(() =>
        bankAccount.transfer(2, bankAccount),
    ).toThrow(new TransferFailedError());
  });

  test('should deposit money', () => {
    expect(new BankAccount(10).deposit(2)).toHaveProperty('balance', 12);
  });

  test('should withdraw money', () => {
    expect(new BankAccount(10).withdraw(2)).toHaveProperty('balance', 8);
  });

  test('should transfer money', () => {
    const senderAccount = new BankAccount(10);
    const receiverAccount = new BankAccount(7);

    expect(senderAccount.transfer(5, receiverAccount)).toHaveProperty(
      'balance',
      5,
    );
    expect(receiverAccount).toHaveProperty('balance', 12);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = new BankAccount(10);
    const spy = jest.spyOn(_, 'random');

    spy.mockReturnValue(1);

    await expect(account.fetchBalance()).resolves.not.toBeNaN();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = new BankAccount(10);
    const spy = jest.spyOn(account, 'fetchBalance');

    spy.mockResolvedValueOnce(500);

    expect(account).toHaveProperty('balance', 10);

    await expect(account.synchronizeBalance()).resolves.not.toThrow();

    expect(account).toHaveProperty('balance', 500);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const senderAccount = new BankAccount(10);
    const spy = jest.spyOn(senderAccount, 'fetchBalance');

    spy.mockResolvedValueOnce(null);

    await expect(() => senderAccount.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
