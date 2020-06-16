export class WSMessageHandler {
  logPath?: string;
  isLogMode?: boolean;
  logMessagesAmount?: number;

  constructor(logPath?: string, isLogMode?: boolean, logMessagesAmount?: number) {
    this.logPath = logPath;
    this.isLogMode = isLogMode;
    this.logMessagesAmount = logMessagesAmount;
  }
}
