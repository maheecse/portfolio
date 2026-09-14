function InteractiveTerminal({ soundEnabled }) {
    const [input, setInput] = React.useState('');
    const [history, setHistory] = React.useState([
        { type: 'system', text: 'Initializing Mahee OS Terminal v2.4...' },
        { type: 'system', text: 'Connected to International Islamic University Chittagong node.' },
        { type: 'info', text: 'Type "help" to view available commands.' }
    ]);

    const handleCommand = (e) => {
        if (e.key === 'Enter') {
            if (soundEnabled) playSoundEffect('click');
            const cmd = input.trim().toLowerCase();
            const newHist = [...history, { type: 'user', text: `$ ${input}` }];

            if (cmd === 'help') {
                newHist.push({ type: 'response', text: 'Available commands:\n • help : Show command options\n • about : Display biography\n • skills : List core programming skills\n • cp : Show Codeforces profile\n • contact : Get email & phone\n • clear : Clear terminal window' });
            } else if (cmd === 'about') {
                newHist.push({ type: 'response', text: `${PORTFOLIO_DATA.fullName}\n${PORTFOLIO_DATA.degree} @ IIUC.\nPassionate about algorithms, C++, Java, and software development.` });
            } else if (cmd === 'skills') {
                newHist.push({ type: 'response', text: 'C++ (STL) • Java (OOP) • Data Structures & Algorithms • Competitive Programming • HTML5/CSS3/JS' });
            } else if (cmd === 'cp') {
                newHist.push({ type: 'response', text: `Codeforces Handle: @${PORTFOLIO_DATA.socials.codeforces.username}\nURL: ${PORTFOLIO_DATA.socials.codeforces.url}` });
            } else if (cmd === 'contact') {
                newHist.push({ type: 'response', text: `Email: ${PORTFOLIO_DATA.email}\nPhone: ${PORTFOLIO_DATA.phone}\nLocation: ${PORTFOLIO_DATA.location}` });
            } else if (cmd === 'clear') {
                setHistory([]);
                setInput('');
                return;
            } else if (cmd !== '') {
                newHist.push({ type: 'error', text: `Command not recognized: "${cmd}". Type "help" for valid commands.` });
            }

            setHistory(newHist);
            setInput('');
        }
    };

    return (
        <div className="w-full rounded-2xl bg-[#080512] border border-purple-900/60 shadow-2xl overflow-hidden font-mono text-xs">
            <div className="bg-[#120B24] px-4 py-3 flex items-center justify-between border-b border-purple-900/50">
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block"></span>
                </div>
                <span className="text-gray-400 font-semibold text-[11px]">mahee@iiuc-cse:~</span>
                <div className="w-4"></div>
            </div>

            <div className="p-4 h-64 overflow-y-auto space-y-2 text-gray-300">
                {history.map((item, idx) => (
                    <div key={idx} className={
                        item.type === 'user' ? 'text-purple-300 font-bold' :
                        item.type === 'error' ? 'text-rose-400' :
                        item.type === 'system' ? 'text-cyan-400/80' : 'text-gray-300 whitespace-pre-line'
                    }>
                        {item.text}
                    </div>
                ))}

                <div className="flex items-center gap-2 pt-1 text-purple-400">
                    <span>$</span>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleCommand}
                        placeholder="type command here..."
                        className="bg-transparent border-none outline-none text-white w-full font-mono text-xs focus:ring-0"
                    />
                </div>
            </div>
        </div>
    );
}