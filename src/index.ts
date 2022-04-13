const canvas = document.querySelector('canvas')!
const c = canvas.getContext('2d')!

canvas.width = 1420
canvas.height = 780

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.7
 