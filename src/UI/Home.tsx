import CreateUser from "../features/user/CreateUser";
const Home = () => {
  // const username = useSelector((state) => state.user.username)

  return (
    <div className="my-10 px-4 text-center sm:my-16">
      <h1 className="mb-8 text-xl font-bold md:text-3xl text-zinc-100 uppercase tracking-widest">
        The best pizza.
        <br />
        <span className="text-orange-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>

      <CreateUser />
    </div>
  );
};

export default Home;
