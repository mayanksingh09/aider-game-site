from flask import Flask, jsonify, request

app = Flask(__name__)

# Game state
game_state = {
    "player1": 0,
    "player2": 0,
    "turn": "player1"
}

@app.route('/api/game', methods=['GET'])
def get_game_state():
    return jsonify(game_state)

@app.route('/api/move', methods=['POST'])
def make_move():
    player = request.json.get('player')
    if player == game_state['turn']:
        game_state[player] += 1
        game_state['turn'] = 'player2' if player == 'player1' else 'player1'
    return jsonify(game_state)

if __name__ == '__main__':
    app.run(debug=True)
