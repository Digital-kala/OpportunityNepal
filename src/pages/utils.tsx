export function handleNavLinkClick(hash:string){
    window.location.hash = hash;
};

export function redirectHome(){
    window.location.hash = "";
};

export function formatDate(date:Date) {
    const dateString = date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    if(dateString === "Invalid Date") return "Not specified"
    return dateString;
}