export default function taskCatch(func: (err: Error) => void) {
  return (err: Error): Promise<unknown> => {
    func(err);
    throw err;
  };
}
