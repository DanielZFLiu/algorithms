import time
import importlib
import sys

def main():
    if len(sys.argv) != 3:
        print("Usage: python benchmark.py <module> <function>")
        sys.exit(1)

    module_name = sys.argv[1]
    function_name = sys.argv[2]

    try:
        module = importlib.import_module(module_name)
        func = getattr(module, function_name)
    except (ImportError, AttributeError) as e:
        print(f"Error: {e}")
        sys.exit(1)

    start_time = time.time()
    result = func()
    end_time = time.time()

    print(f"Result: {result}")
    print(f"Execution time: {end_time - start_time:.6f} seconds")

if __name__ == "__main__":
    main()
