import { type HtmlTagDescriptor, type Plugin, createLogger, defineConfig } from 'vite'

import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/

const logger = createLogger()
const loggerWarn = logger.warn

logger.warn = (msg, options) => {
  // Ignore "COMMONJS_VARIABLE_IN_ESM" warnings from DashJS as it's a known issue in their ESM distribution,
  // and the log message is extremely long and unnecessarily bloats the output
  // See: https://github.com/Dash-Industry-Forum/dash.js/issues/4837
  if (msg.includes('COMMONJS_VARIABLE_IN_ESM') && msg.includes('node_modules/dashjs/dist/modern/esm/dash.all.min.js')) {
    return
  }
  loggerWarn(msg, options)
}

function htmlPlugin({ development }: { development?: boolean }): Plugin {
  return {
    name: 'html-transform',
    transformIndexHtml(html) {
      const tags: HtmlTagDescriptor[] = []
      if (development) {
        tags.push({
          tag: 'script',
          children: `window.appSettings = {
            GIT_COMMIT: 'unknown',
            USE_MSW: true,
            VITE_HM_REGISTER_URL: 'http://localhost:8080',
            VITE_IMAGE_PROXY_URL: 'http://localhost:8082/imageproxy',
            MILJO: 'local',
          }`,
        })
      } else {
        tags.push(
          {
            tag: 'script',
            children: `window.appSettings = {}`,
          },
          {
            tag: 'script',
            attrs: {
              src: '/newsadmin/settings.js',
            },
          }
        )
      }
      return {
        html,
        tags,
      }
    },
  }
}

export default defineConfig((env) => ({
  base: env.mode === 'development' ? '/' : '/newsadmin',
  plugins: [htmlPlugin({ development: env.mode === 'test' || env.mode === 'development' }), react()],
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    global: true,
    environment: 'jsdom',
    server: {
      deps: {
        inline: ['@testing-library/user-event'],
      },
    },
    setupFiles: ['vitest-setup.ts'],
  },
  customLogger: logger,
}))
