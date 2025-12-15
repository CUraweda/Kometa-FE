const Block = () => {
  return (
    <div className="">
      <div className="w-full h-screen justify-center items-center flex flex-col text-center">
        <div></div>
        <div className="w-full justify-center flex">
          <img
            src="https://cdn3d.iconscout.com/3d/premium/thumb/website-block-3d-icon-png-download-10873152.png"
            className="w-96"
            alt="Block"
          />
        </div>
        <h1 className="text-3xl font-bold">
          This website Blocked by Administrator
        </h1>

        <p className="read-the-docs">
          Please Contact the Administrator for Unblock website !
        </p>
      </div>
    </div>
  );
};

export default Block;
