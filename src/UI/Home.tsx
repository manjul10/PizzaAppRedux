import CreateUser from "../features/user/CreateUser";
const Home = () => {
  // const username = useSelector((state) => state.user.username)

  return (
    //  <form onSubmit={handleSubmit} className="flex flex-col text-center">
    <div className="flex flex-col">
      <h1 className="text-3xl leading-loose font-semibold">The best Pizza.</h1>
      <h3 className="text-3xl text-yellow-500 mb-6">
        Straight out of the oven, straight to you.
      </h3>
      <CreateUser />
    </div>
    // </form>
  );
};

export default Home;
