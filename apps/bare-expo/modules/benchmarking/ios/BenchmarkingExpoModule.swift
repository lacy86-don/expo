import ExpoModulesCore

struct Point: Record {
  @Field
  var x: Double = 0

  @Field
  var y: Double = 0
}

public final class BenchmarkingExpoModule: Module {
  public func definition() -> ModuleDefinition {
    Name("BenchmarkingExpoModule")

    // no-op

    Function("nothing") {}
    Function("nothingOptimized", nothingOptimized())

    // Adding numbers (sync)

    Function("addNumbers") { (a: Double, b: Double) in
      return a + b
    }

    Function("addNumbersOptimized", addNumbersOptimized())

    // Adding numbers (async)

    AsyncFunction("addNumbersAsync") { (a: Double, b: Double) in
      return a + b
    }

    AsyncFunction("addNumbersAsyncOptimized", addNumbersAsyncOptimized())

    // Adding strings

    Function("addStrings") { (a: String, b: String) in
      return a + b
    }

    Function("addStringsOptimized", addStringsOptimized())

    // Other

    Function("foldArray") { (array: [Double]) in
      return array.reduce(0.0, +)
    }

    Function("echoObject") { (point: Point) in
      return point
    }
  }

  @OptimizedFunction
  private func nothingOptimized() -> Void {}

  @OptimizedFunction
  private func addNumbersOptimized(a: Double, b: Double) throws -> Double {
    return a + b
  }

  @OptimizedFunction
  private func addNumbersAsyncOptimized(a: Double, b: Double) throws -> Double {
    return a + b
  }

  @OptimizedFunction
  private func addStringsOptimized(a: String, b: String) throws -> String {
    return a + b
  }
}
