// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
export function isNumeric(value: any): boolean {
  // https://stackoverflow.com/questions/18082/validate-decimal-numbers-in-javascript-isnumeric/1830844#1830844
  // return !isNaN(parseFloat(value)) && isFinite(value);

  // https://github.com/angular/angular/blob/4.3.x/packages/common/src/pipes/number_pipe.ts#L172
  return !isNaN(value - parseFloat(value));
}
