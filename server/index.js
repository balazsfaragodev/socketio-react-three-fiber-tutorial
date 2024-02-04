import { Server } from "socket.io";

const io = new Server({
    cors: {
        origin: "http://localhost:5173",
    },
});

io.listen(3001);

const characters = new Map();

const randomPosition = () => {
    return [Math.random() * 10, 0, Math.random() * 3];
};

const randomBrownHexColor = () => {
    const red = Math.floor(Math.random() * 50) + 100;
    const green = Math.floor(Math.random() * 30) + 70;
    const blue = Math.floor(Math.random() * 20) + 30;

    // Convert the components to hexadecimal and format the color
    const hexColor = `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`;

    return hexColor;
};

io.on("connection", (socket) => {
    console.log("user connected");

    // Add character to Map
    characters.set(socket.id, {
        id: socket.id,
        position: randomPosition(),
        dogColor: randomBrownHexColor()
    });

    // Emit all characters to all clients
    io.emit("characters", Array.from(characters.values()));

    socket.on("move", (position) => {
        if (characters.has(socket.id)) {
            const character = characters.get(socket.id);
            character.position = position;
            // Emit updated characters
            io.emit("characters", Array.from(characters.values()));
        }
    });

    socket.on("disconnect", () => {
        console.log("user disconnected");
        // Remove character from Map
        characters.delete(socket.id);
        // Emit updated characters
        io.emit("characters", Array.from(characters.values()));
    });
});