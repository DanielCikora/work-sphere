import Title from "../ui/Title";
import Jobs from "./Jobs";
const Dashboard = () => {
  return (
    <section className='dashboard'>
      <div className='wrapper'>
        <Title titleClass='md:text-4xl text-2xl pt-4' titleText='Work Sphere' />
        <div className='dashboard-content py-20'>
          <Jobs />
        </div>
      </div>
    </section>
  );
};
export default Dashboard;
