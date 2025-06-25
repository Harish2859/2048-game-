import logic

if __name__ == '__main__':
	mat = logic.start_game()

while True:
	x = input("Press the command : ")
	if x in ('W', 'w'):
		mat, flag = logic.move_up(mat)
	elif x in ('S', 's'):
		mat, flag = logic.move_down(mat)
	elif x in ('A', 'a'):
		mat, flag = logic.move_left(mat)
	elif x in ('D', 'd'):
		mat, flag = logic.move_right(mat)
	else:
		print("Invalid Key Pressed")
		continue

	status = logic.get_current_state(mat)
	print(status)

	if status == 'GAME NOT OVER':
		logic.add_new_2(mat)
	else:
		break

	print(mat)
