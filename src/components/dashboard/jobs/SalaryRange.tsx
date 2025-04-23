type SalaryRangePropsDataTypes = {
  salaryRange: number;
  setSalaryRange: (value: number) => void;
};
export default function SalaryRange({
  salaryRange,
  setSalaryRange,
}: SalaryRangePropsDataTypes) {
  return (
    <section className='salary-range mx-auto mb-[40px] max-w-[800px]'>
      <input
        type='range'
        min='0'
        max={500000}
        step='10000'
        value={salaryRange}
        onChange={(event) => setSalaryRange(Number(event.target.value))}
        className='range block w-full'
      />
      <h3 className='text-center font-medium md:text-lg text-md'>
        {`Salary Range: Up to ${salaryRange.toLocaleString()} $`}
      </h3>
    </section>
  );
}
