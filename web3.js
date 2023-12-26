async function connectToMetaMask() {
    try {
        // Solicitar al usuario que conecte su cuenta MetaMask
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        // Verificar si la conexión fue exitosa
        if (window.ethereum.selectedAddress) {
            console.log('Conectado a MetaMask:', window.ethereum.selectedAddress);

            // Aquí puedes realizar operaciones adicionales después de la conexión
            // Actualizar la interfaz, realizar llamadas al contrato, etc.

            // Ejemplo: Llamar a la función updateUI después de la conexión
            updateUI();
        } else {
            console.error('Error al conectar a MetaMask');
        }
    } catch (error) {
        console.error('Error al solicitar cuentas a MetaMask:', error.message);
    }
}

// Actualiza con la dirección del contrato y la red Ethereum que estás utilizando
const contractAddress = '0x29D1Bf24a79C7d1FB8681C83ab738fB78E39a660';
const contractABI = [{"inputs":[{"internalType":"address","name":"_usdtAddress","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"claimDividends","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"creatorWallet","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"dividendPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getUserDailyDividends","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"isDepositor","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"lastDividendClaim","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalDeposits","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"treasuryPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"usdtAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"usdtToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userDeposits","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userDividends","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawDividends","outputs":[],"stateMutability":"nonpayable","type":"function"}];  // Coloca aquí el ABI del contrato

// Conectar a la red BSC
const web3 = new Web3('https://bsc-dataseed1.binance.org:443'); // Actualiza con el proveedor BSC correcto
const contract = new web3.eth.Contract(contractABI, contractAddress);

async function updateUI() {
    const totalDeposits = await contract.methods.totalDeposits().call();
    const userDeposits = await contract.methods.userDeposits(userAddress).call();
    const userDividends = await contract.methods.userDividends(userAddress).call();

    document.getElementById('totalDeposits').innerText = totalDeposits.toString();
    document.getElementById('userDeposits').innerText = userDeposits.toString();
    document.getElementById('userDividends').innerText = userDividends.toString();
}

// Llamada inicial para actualizar la interfaz
updateUI();


// Crear la instancia del contrato
const contract = new ethers.Contract(contractAddress, contractABI, signer);

// Actualiza la dirección del usuario
const userAddress = 'DIRECCION_USUARIO';

// Funciones de interacción con el contrato
async function updateUI() {
    const totalDeposits = await contract.totalDeposits();
    const userDeposits = await contract.userDeposits(userAddress);
    const userDividends = await contract.userDividends(userAddress);
    const treasuryPool = await contract.treasuryPool();
    const dividendPool = await contract.dividendPool();
    const creatorWallet = await contract.creatorWallet();
    const totalDepositors = await contract.totalDepositors();

    document.getElementById('totalDeposits').innerText = totalDeposits.toString();
    document.getElementById('userDeposits').innerText = userDeposits.toString();
    document.getElementById('userDividends').innerText = userDividends.toString();
    document.getElementById('treasuryPool').innerText = treasuryPool.toString();
    document.getElementById('dividendPool').innerText = dividendPool.toString();
    document.getElementById('creatorWallet').innerText = creatorWallet.toString();
    document.getElementById('totalDepositors').innerText = totalDepositors.toString();
}

async function deposit() {
    // Implementa la lógica para realizar un depósito
}

async function withdraw() {
    // Implementa la lógica para realizar un retiro
}

async function claimDividends() {
    // Implementa la lógica para reclamar dividendos
}

async function withdrawDividends() {
    // Implementa la lógica para retirar dividendos
}

// Llamada inicial para actualizar la interfaz
updateUI();
