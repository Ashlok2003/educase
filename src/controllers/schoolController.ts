import { Request, Response } from 'express'
import { pool } from '../services/dbService'
import { calculateDistance } from '../utils/distance'

export async function addSchool(req: Request, res: Response) {
  const { name, address, latitude, longitude } = req.body

  if (!name || typeof name !== 'string') return res.status(400).json({ error: 'Invalid name' })
  if (!address || typeof address !== 'string')
    return res.status(400).json({ error: 'Invalid address' })
  if (typeof latitude !== 'number' || latitude < -90 || latitude > 90)
    return res.status(400).json({ error: 'Invalid latitude' })
  if (typeof longitude !== 'number' || longitude < -180 || longitude > 180)
    return res.status(400).json({ error: 'Invalid longitude' })

  try {
    const conn = await pool.getConnection()
    await conn.query(
      'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
      [name, address, latitude, longitude],
    )
    conn.release()
    res.status(201).json({ message: 'School added successfully' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Database error' })
  }
}

export async function listSchools(req: Request, res: Response) {
  const { lat, lon } = req.query

  if (!lat || !lon) return res.status(400).json({ error: 'Latitude and longitude required' })

  const userLat = parseFloat(lat as string)
  const userLon = parseFloat(lon as string)

  if (isNaN(userLat) || isNaN(userLon))
    return res.status(400).json({ error: 'Invalid coordinates' })

  try {
    const conn = await pool.getConnection()
    const [rows] = await conn.query('SELECT * FROM schools')
    conn.release()

    const schools = (rows as any[]).map((s) => ({
      ...s,
      distance_km: calculateDistance(userLat, userLon, s.latitude, s.longitude),
    }))

    schools.sort((a, b) => a.distance_km - b.distance_km)

    res.json(schools)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Database error' })
  }
}
