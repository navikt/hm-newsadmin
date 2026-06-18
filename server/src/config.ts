import path from 'path'

export const config = {
  base_path: process.env.NODE_ENV === 'production' ? '/newsadmin' : '/',
  build_path: path.join(__dirname, '../../client/dist'),
  port: process.env.PORT || 5001,
  node_env: process.env.NODE_ENV || 'production',
  nais_cluster_name: process.env.NAIS_CLUSTER_NAME || 'labs-gcp',
}
