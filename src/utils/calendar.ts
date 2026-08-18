export function openGoogleCalendar() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  
  // Start: 21st at 18:30:00 ICT (11:30 UTC)
  // End: 21st at 23:59:00 ICT
  const title = encodeURIComponent("Buriram Night & Glow Festival 2026");
  const details = encodeURIComponent("งานเทศกาลแสดงแสงไฟและศิลปะราตรีบุรีรัมย์ จัดโดย Landmark LightWork ณ พิกัด 14.999923, 103.109930");
  const location = encodeURIComponent("14.999923, 103.109930, Buriram, Thailand");
  const dates = `${year}${month}21T113000Z/${year}${month}21T170000Z`;

  const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
  window.open(url, '_blank');
}
