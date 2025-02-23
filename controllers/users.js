export const usersController = {
  updateUserBalance: async (req, res) => {
    try {
      const user = req.user;
      const { newBalance } = req.body;

      if (
        typeof newBalance !== "number" ||
        isNaN(newBalance) ||
        newBalance < 0
      ) {
        return res
          .status(400)
          .send({ message: "New balance must be a number" });
      }

      user.balance = newBalance;
      await user?.save();

      return res.status(200).send({ newBalance });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: "Error updating balance" });
    }
  },

  getUserData: async (req, res) => {
    try {
      const user = req.user;
      if (!user) {
        return res.status(401).send({ message: "Unauthorized" });
      }

      return res.status(200).send({
        email: user.email,
        balance: user.balance,
        transactions: user.transactions,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: "Error retrieving user data" });
    }
  },
};
