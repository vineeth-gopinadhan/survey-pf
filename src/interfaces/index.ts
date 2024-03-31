export interface OptionData {
  optionId: number | -1;
  questionId: number;
  imageUrl?: string;
  subtitle: string;
  skipToQuestion?: number | null;
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CustomError {
  message: string;
}

export interface ServiceError {
  statusCode: number;
  message: string;
}
