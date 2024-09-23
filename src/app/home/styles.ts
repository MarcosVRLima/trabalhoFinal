import { StyleSheet } from 'react-native';

export const style = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#F0F0F0',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    bemVindo: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    botaoAdicionar: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 50,
    },
    listaContas: {
        paddingBottom: 16,
    },
    cardConta: {
        backgroundColor: '#FFF',
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    nomeConta: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    valorConta: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    textoSemContas: {
        textAlign: 'center',
        marginTop: 16,
        fontSize: 16,
        color: '#666',
    }
});
