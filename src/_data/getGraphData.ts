import db from "@/_db/prisma";
import moment from "moment";

export async function getGraphData() {
  try {
    // Get the start and end dates of the data range (7 days ago and today)
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 6);
    const endDate = new Date();
    // const startDate = moment().subtract(6, "days").startOf("day");
    // const endDate = moment().endOf("day");

    // Query the database to get order data grouped by createdAt date
    const orders = await db.order.groupBy({
      by: ["createdAt"],
      _sum: {
        amount: true,
      },
      where: {
        createdAt: {
          // gte: startDate,
          // lte: endDate,
          gte: startDate.toISOString(),
          lte: endDate.toISOString(),
        },
        status: "complete",
      },
    });

    // Initilize an object to aggregate the data by date
    const aggregatedData: {
      [day: string]: { day: string; date: string; totalAmount: number };
    } = {};

    // Create a clone of the start date to iterate over each day
    const currentDate = new Date(startDate);
    // const currentDate = startDate.clone();

    // Iterate over each day in the range
    while (currentDate <= endDate) {
      // Format the date as a string (e.g., "Monday")
      const day = currentDate.toLocaleDateString("en-US", { weekday: "long" });
      // const day = moment(currentDate).format("dddd");

      // Format the date as a string (e.g., "2021-01-01")
      const date = currentDate.toISOString().split("T")[0];
      // const date = currentDate.format("YYYY-MM-DD");

      // Initialize the total amount for the day
      aggregatedData[day] = { day, date, totalAmount: 0 };

      // Move to the next day
      currentDate.setDate(currentDate.getDate() + 1);
      // currentDate.add(1, "day");
    }

    // Calculate the total amount for each day
    orders.forEach((order) => {
      const day = order.createdAt.toLocaleDateString("en-US", {
        weekday: "long",
      });
      // const day = moment(order.createdAt).format("dddd");

      aggregatedData[day].totalAmount += order._sum.amount || 0;
    });

    // // Convert the aggregated data to an array and sort by date
    // const graphData = Object.values(aggregatedData).sort(
    //   (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    //   // (a, b) => moment(a.date).diff(moment(b.date)),
    // );

    // Convert the aggregated data to an array
    const graphData = Object.values(aggregatedData);

    return graphData;
  } catch (error) {
    throw new Error("Failed to get graph data");
    // console.log(error);
  }
}
