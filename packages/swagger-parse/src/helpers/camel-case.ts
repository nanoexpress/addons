export default (str: string): string =>
  str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
