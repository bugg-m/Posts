import { ChangeEventHandler, MouseEventHandler } from "react";

export type signInProps = {
  email: string;
  password: string;
};
export type signUpProps = {
  email: string;
  password: string;
  avatar: string;
  role: string;
};
export type labelProps = {
  className: string;
  title: string;
};

export type liProps = {
  className: string;
  handleEvent: MouseEventHandler<HTMLLIElement>;
  name: string;
  hidden: boolean;
};
export type inputProps = {
  className: string;
  handleEvent: ChangeEventHandler<HTMLInputElement>;
  name: string;
  placeholder: string;
  type: string;
  value: string;
  required: boolean;
};
export type inputFileProps = {
  className: string;
  handleEvent: ChangeEventHandler<HTMLInputElement>;
  name: string;
  placeholder: string;
  type: string;
  value: string;
  required: boolean;
};

export type divProps = {
  className: string;
  children: React.ReactNode;
};
export type borderProps = {
  className: string;
  width: string;
  side: "r" | "b" | "t" | "l" | "x" | "y";
  color: string;
  intensity: 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
};
