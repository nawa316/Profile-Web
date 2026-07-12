import pool from '../config';
import { Skill, CreateSkillInput, UpdateSkillInput } from '../../types';
import { AppError } from '../errors';

export class SkillModel {
  static async findAll(): Promise<Skill[]> {
    const query = 'SELECT * FROM skills ORDER BY category ASC, name ASC';
    const result = await pool.query<Skill>(query);
    return result.rows;
  }

  static async findById(id: number): Promise<Skill | null> {
    const query = 'SELECT * FROM skills WHERE id = $1';
    const result = await pool.query<Skill>(query, [id]);
    return result.rows[0] || null;
  }

  static async create(input: CreateSkillInput): Promise<Skill> {
    const query = `
      INSERT INTO skills (name, image, category)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    const result = await pool.query<Skill>(query, [
      input.name, input.image || null, input.category || null
    ]);
    return result.rows[0];
  }

  static async update(id: number, input: UpdateSkillInput): Promise<Skill | null> {
    const updates: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    Object.entries(input).forEach(([key, value]) => {
      if (value !== undefined && key !== 'id' && key !== 'created_at' && key !== 'updated_at') {
        updates.push(`${key} = $${paramCount++}`);
        values.push(value);
      }
    });

    if (updates.length === 0) {
      throw new AppError('No fields to update', 400);
    }

    updates.push(`updated_at = NOW()`);
    values.push(id);

    const query = `
      UPDATE skills 
      SET ${updates.join(', ')} 
      WHERE id = $${paramCount} 
      RETURNING *
    `;

    const result = await pool.query<Skill>(query, values);
    return result.rows[0] || null;
  }

  static async delete(id: number): Promise<boolean> {
    const query = 'DELETE FROM skills WHERE id = $1 RETURNING *';
    const result = await pool.query(query, [id]);
    return result.rowCount !== null && result.rowCount > 0;
  }
}
