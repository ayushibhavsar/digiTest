export const EMAIL_REGEX = /\S+@\S+\.\S+/;
export const NAMES_REGEX = /^[a-z ,.'-]+$/i;
export const NUM_REGEX = /^[0-9\b]+$/;
export const  STRONGPASSWORD_REGEX = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[~!@#$%^&*])(?=.{4,})"
);