def print_board(board):
    for row in board:
        print(" | ".join(row))
        print("-" * 9)

def check_winner(board, player):
    # Check rows
    for row in board:
        if all(cell == player for cell in row):
            return True
    
    # Check columns
    for col in range(3):
        if all(board[row][col] == player for row in range(3)):
            return True
            
    # Check diagonals
    if all(board[i][i] == player for i in range(3)):
        return True
    if all(board[i][2-i] == player for i in range(3)):
        return True
        
    return False

def is_board_full(board):
    return all(cell != " " for row in board for cell in row)

def play_game():
    board = [[" " for _ in range(3)] for _ in range(3)]
    current_player = "X"
    
    print("Welcome to Tic-Tac-Toe!")
    print_board(board)
    
    while True:
        print(f"Player {current_player}'s turn.")
        try:
            row = int(input("Enter row (0, 1, 2): "))
            col = int(input("Enter column (0, 1, 2): "))
            
            if row < 0 or row > 2 or col < 0 or col > 2:
                print("Invalid input! Please enter numbers between 0 and 2.")
                continue
                
            if board[row][col] != " ":
                print("That cell is already taken! Try again.")
                continue
                
            board[row][col] = current_player
            print_board(board)
            
            if check_winner(board, current_player):
                print(f"Player {current_player} wins!")
                break
                
            if is_board_full(board):
                print("It's a tie!")
                break
                
            current_player = "O" if current_player == "X" else "X"
            
        except ValueError:
            print("Invalid input! Please enter a number.")
        except KeyboardInterrupt:
            print("\nGame exited.")
            break

if __name__ == "__main__":
    while True:
        play_game()
        play_again = input("\nDo you want to play again? (y/n): ").strip().lower()
        if play_again != 'y':
            print("Thanks for playing!")
            break