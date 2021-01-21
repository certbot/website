require "jekyll-watch"

module Jekyll
  module Watcher
    class << self
      alias jekyll_watch watch

      def watch(*args)
        certbot_instructions_watch(*args)
        jekyll_watch(*args)
      end

      def certbot_instructions_watch(options, site=nil)
        path = "_data/"
        opts = { force_polling: options["force_polling"] }

        listener = Listen.to(path, opts) do |m, a, _|
          (m + a).each do |path|
            if File.basename(path) == "inputs.json"
              system("gulp", "instructions")
            end
          end
        end

        listener.start

        trap("INT") { listener.stop }
      end
    end
  end
end

Jekyll::Hooks.register :site, :after_init do
  system("gulp", "instructions")
end
