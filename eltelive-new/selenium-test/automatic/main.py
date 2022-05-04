import operations
from operations import driver, reset, give_input, set_up, tear_down
import sys
import json

if __name__ == "__main__":
    result = []
    output = []
    try:
        f = open(str(sys.argv[1]))
    finally:
        data = json.load(f)
        for x in (data['test_suite']['input_list']):
            if x == '<reset>':
                reset()
                result.append("")
            else:
                result.append(give_input(int(x)))

        
        for i in result:
            if i[:-1] == "selenium_output_":
                output.append(i[-1:])
            else:
                output.append(i)
        print(output)
        print(data['test_suite']['output_list'])
        if (len(output) != len(data['test_suite']['output_list'])):
            print("The output lengths are different!")
        current_sequence_suite = []
        current_sequence_output = []

        for x in range(len(data['test_suite']['output_list'])):
            current_sequence_output.append(output[x])
            current_sequence_suite.append(data['test_suite']['output_list'][x])
            if(output[x] != data['test_suite']['output_list'][x]):
                print("outputs are different:")
                print(current_sequence_output)
                print("should be:")
                print(current_sequence_suite)
                break
            else:
                if(output[x] == ""):
                    current_sequence_suite = []
                    current_sequence_output = []

    tear_down()
