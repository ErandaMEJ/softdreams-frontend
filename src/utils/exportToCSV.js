export const exportOrdersToCSV = (orders) => {
    if (!orders || orders.length === 0) {
        alert("No orders to export");
        return;
    }

    // Define CSV headers
    const headers = ["Order ID", "Customer Name", "Email", "Date", "Status", "Total Amount (LKR)", "Items"];

    // Map order data to CSV rows
    const rows = orders.map(order => [
        order.orderId,
        `"${order.name}"`, // Quote strings that might contain commas
        order.email,
        new Date(order.date).toLocaleDateString(),
        order.status,
        order.total,
        `"${order.orderedItems.map(item => `${item.name} (x${item.quantity})`).join(", ")}"`
    ]);

    // Combine headers and rows
    const csvContent = [
        headers.join(","),
        ...rows.map(row => row.join(","))
    ].join("\n");

    // Create a Blob and trigger download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `orders_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
