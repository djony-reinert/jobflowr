# frozen_string_literal: true

module SafeMigrationHelper
  def with_lock_timeout(time = 1000)
    set_lock = proc { execute("SET LOCAL lock_timeout='#{time.to_i}ms';") }
    if reverting?
      yield
      reversible { |dir| dir.down &set_lock }
    else
      reversible { |dir| dir.up &set_lock }
      yield
    end
  end
end
