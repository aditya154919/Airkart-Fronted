import React from 'react'

const Emailverify = () => {
    const[isLogin,setIsLogin] = useState(false);
  return (
    <div className=" min-h-screen flex justify-center mt-5  relative overflow-hidden">
      {/* <Toaster position="top-center" reverseOrder={false} /> */}

      {/* Floating circles for animation background */}
      <motion.div
        className=" absolute w-72 h-72  rounded-full blur-3xl -top-10 -left-10"
        animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
      />
      <motion.div
        className="absolute w-72 h-72  rounded-full blur-3xl bottom-0 right-0"
        animate={{ y: [0, -20, 0], x: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 8 }}
      />

      {/* Auth Card */}
      <motion.div
        layout
        className="backdrop-blur-2xl shadow-2xl rounded-2xl w-full max-w-md p-8 bg-white/20 border border-white/30 z-10"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-3xl font-semibold text-center text-white mb-6">
          {isLogin ? "Welcome Back-Please login 👋" : "Welcome to Airkart Create Your Account 🚀"}
        </h2>

        <AnimatePresence mode="wait">
          <motion.form
            key={isLogin ? "login" : "signup"}
            initial={{ opacity: 0, x: isLogin ? 100 : -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isLogin ? -100 : 100 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            {!isLogin && (
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="border-none rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white/30 text-white placeholder-white/70"
                required
              />
            )}

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="border-none rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white/30 text-white placeholder-white/70"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="border-none rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white/30 text-white placeholder-white/70"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-yellow-400 text-black py-2 rounded-lg font-semibold hover:bg-yellow-300 transition disabled:opacity-60"
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="border-2 border-black border-t-transparent w-5 h-5 rounded-full mx-auto"
                ></motion.div>
              ) : isLogin ? (
                "Login"
              ) : (
                "Sign Up"
              )}
            </button>
          </motion.form>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 text-center text-sm text-white"
        >
          {isLogin ? "Don’t have an account?" : "Already registered?"}{" "}
          <button
            onClick={toggleForm}
            className="text-yellow-300 font-medium hover:underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Emailverify
