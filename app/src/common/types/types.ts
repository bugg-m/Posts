import React from "react";

export type signInProps = {
  email: string;
  password: string;
};
export type signUpProps = signInProps & {
  avatar: string;
  role: string;
};
export type labelProps = {
  className?: string;
  title: string;
};

export type liProps = {
  className?: string;
  handleEvent: React.MouseEventHandler<HTMLLIElement>;
  name: string;
  hidden?: boolean;
};
export type checkboxProps = {
  className?: string;
  name: string;
  type?: string;
  id?: string;
};

export type divProps = React.ComponentPropsWithoutRef<"div"> & {
  justify:
    | "center"
    | "end"
    | "start"
    | "between"
    | "around"
    | "evenly"
    | "stretch"
    | "normal";
  items?:
    | "center"
    | "end"
    | "start"
    | "between"
    | "around"
    | "evenly"
    | "stretch"
    | "normal";
};

export type borderProps = {
  className?: string;
  width: string;
  side: "r" | "b" | "t" | "l" | "x" | "y";
  color: string;
  intensity: 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;
};

export type divSwipeProps = React.ComponentPropsWithoutRef<"div"> & {
  handleEvent?: React.MouseEventHandler<HTMLDivElement>;
};

export type divMOverOutProps = React.ComponentPropsWithoutRef<"div"> & {
  onMouseOver: React.MouseEventHandler<HTMLDivElement>;
  onMouseOut: React.MouseEventHandler<HTMLDivElement>;
};

export type formProps = {
  className?: string;
  encType:
    | "application/x-www-form-urlencoded"
    | "multipart/form-data"
    | "text/plain	";
  method: "POST" | "PUT";
  // handleSubmit: any;
  children: React.ReactNode;
};
