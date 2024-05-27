const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const socket = io('http://localhost:5000');
        socket.on('message', (data) => {
            setMessages((messages) => [...messages, data]);
        });
    }, []);

    const sendMessage = () => {
        const socket = io('http://localhost:5000');
        socket.emit('message', message);
        setMessage('');
    };

    return (
        <div>
            <ul>
                {messages.map((message, index) => (
                    <li key={index}>{message}</li>
                ))}
            </ul>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}

export default Chat;