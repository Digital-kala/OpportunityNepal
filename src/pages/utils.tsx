export function handleNavLinkClick(hash: string) {
  window.location.hash = hash;
}

export function redirectHome() {
  window.location.hash = "";
}

export function handleURLClick(url: string) {
  window.open(url, "_blank");
}

export function formatDate(date: Date) {
  try {
    const dateString = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    if (dateString === "Invalid Date") return "Not specified";
    return dateString;
  } catch {
    return "Not specified";
  }
}

export function parseDateTimeString(dateString: string) {
  // Split the date and time parts
  const parts = dateString.split(" ");
  const dateParts = parts[0].split("/");
  var timeParts = parts[1].split(":");

  return new Date(
    parseInt(dateParts[2], 10),
    parseInt(dateParts[1], 10) - 1,
    parseInt(dateParts[0], 10),
    parseInt(timeParts[0], 10),
    parseInt(timeParts[1], 10),
    parseInt(timeParts[1], 10)
  );
}
