export function cn(...inputs: Array<string | false | null | undefined>): string {
  return inputs.filter((input): input is string => Boolean(input)).join(" ");
}
