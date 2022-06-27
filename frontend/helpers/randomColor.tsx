
const colors: string[] = [
    "#F79256",
    "#FBD1A2",
    "#7DCFB6",
    "#00B2CA",
    "#1D4E89",
    "#DE1A1A",
    "#E8EBF7",
    "#ACBED8",
    "#F2D398",
    "#D78521"
]
export const generateRandomColor = (): string =>{
    return colors[Math.floor(Math.random()*colors.length)]
}