import rawQuestions from "./questions.json";

export type Traits = {
  aesthetic?: string[];
  energy?: string[];
  props?: string[];
  environment?: string[];
  lifestyle?: string[];
  fashion?: string[];
};

export type Option = {
  id: string;
  label: string;
  subtitle?: string;
  emoji: string;
  traits: Traits;
};

export type Question = {
  id: string;
  question: string;
  subtitle?: string;
  options: Option[];
  inputType?: "text";
  placeholder?: string;
};

export const questions = rawQuestions as Question[];
